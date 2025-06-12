"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getErrorMessage } from "@/utils/utils";

type UploadProps = {
  file:
    | File
    | { name: string; type: string; arrayBuffer: () => Promise<ArrayBuffer> };
};

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFile = async ({ file }: UploadProps) => {
  try {
    const fileName = file.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
    const key = `${uuidv4()}.${fileExtension}`;

    const bucket = "eventz-resources";
    const region = process.env.NEXT_PUBLIC_AWS_REGION;

    const arrayBuffer = await file.arrayBuffer();
    // Use Buffer for Node.js environments, fallback to Uint8Array for browsers
    const body =
      typeof Buffer !== "undefined"
        ? Buffer.from(arrayBuffer)
        : new Uint8Array(arrayBuffer);
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: file.type,
      })
    );
    const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    return { data: { fileUrl: fileUrl }, errorMessage: null };
  } catch (error) {
    return { data: null, errorMessage: getErrorMessage(error) };
  }
};
