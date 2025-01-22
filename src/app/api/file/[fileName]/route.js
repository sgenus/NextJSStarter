import path from 'path';
import fs from 'fs';
import mime from 'mime';


export async function GET(req, { params }) {

    const { fileName } = await params;
    const filePath = path.join(process.cwd(), 'cdn', fileName);

    if (!fs.existsSync(filePath)) {
        return new Response('File not found', { status: 404 });
    }

    const contentType = mime.getType(filePath) || 'application/octet-stream';

    const file = fs.readFileSync(filePath);
    return new Response(file, {
        headers: {
            'Content-Type': contentType,
        },
    });
}
