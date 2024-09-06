import { error } from '@sveltejs/kit';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

// Load Azure storage credentials from environment variables
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

export async function POST({ request }) {
  try {
    // Extract file from the request
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      throw error(400, 'No file uploaded');
    }

    // Initialize the BlobServiceClient
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new StorageSharedKeyCredential(accountName, accountKey)
    );

    // Get the container client
    const containerClient = blobServiceClient.getContainerClient("regs");

    // Create a block blob client
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // Upload the file
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await blobClient.uploadData(fileBuffer);

    return new Response('File uploaded successfully!', { status: 200 });
  } catch (err) {
    console.error('Error uploading file:', err);
    throw error(500, 'Error uploading file');
  }
}
