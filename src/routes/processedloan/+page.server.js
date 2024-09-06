import { error } from '@sveltejs/kit';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

// Load Azure storage credentials from environment variables
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

export async function load() {
    // Initialize the BlobServiceClient
    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        new StorageSharedKeyCredential(accountName, accountKey)
      );
  
    const containerClient = blobServiceClient.getContainerClient('processedloans');
    const blobClient = containerClient.getBlobClient('vector_search_output.txt');
    const blobClient2 = containerClient.getBlobClient('extracted_loan_info.txt');

    try {

        let content = {
            regs: "",
            parsedValues: ""
        }

        const downloadBlockBlobResponse = await blobClient.download();
        content.regs = await streamToText(downloadBlockBlobResponse.readableStreamBody);

        const downloadBlockBlobResponse2 = await blobClient2.download();
        content.parsedValues = await streamToText(downloadBlockBlobResponse2.readableStreamBody);

        return {
            content
        };
    } catch (err) {
        console.error('Error reading the file:', err);
        throw error(500, 'Error reading the file');
    }
}

// Helper function to convert the stream to text
async function streamToText(readableStream) {
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk.toString());
    }
    return chunks.join('');
}
