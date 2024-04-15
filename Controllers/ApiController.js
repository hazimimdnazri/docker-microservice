import { createCanvas, loadImage } from 'canvas';

const index = (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(`Connection from ${ip}`)
    res.send('The server is up and running.')
}

const processApi = async (req, res) => {
    try {
        const cartResponse = await fetch('https://dummyjson.com/cart/2');
        const cartData = await cartResponse.json();
    
        const userResponse = await fetch(`https://dummyjson.com/users/${cartData.userId}`);
        const responseData = await userResponse.json();
    
        const sendRes = {
            user: responseData,
            cart: cartData,
        };

        res.json(sendRes)
    } catch(error) {
        res.status(500).json({ 
            status: 'error', 
            message: 'Something went wrong, please try again later.' 
        });
    }

}

const generateApi = async (req, res) => {
    const imageUrl = req.query.image_url;
    const title = req.query.title;
    const description = req.query.description;

    try {
        const backgroundImage = await loadImage(imageUrl);
        const canvasWidth = 700;
        const canvasHeight = 400;

        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');

        const titleHeight = 30; // Assuming 30px for the title font size
        const descriptionHeight = 20; // Assuming 20px for the description font size
        const totalContentHeight = titleHeight + descriptionHeight;

        const spacingA = (canvasHeight - totalContentHeight) / 2;
        const spacingB = spacingA;

        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        const titleWidth = ctx.measureText(title).width;
        const titleX = (canvasWidth - titleWidth) / 2;
        const titleY = spacingA + titleHeight;

        // Font & Size title
        ctx.font = '20px Arial';
        ctx.fillStyle = 'red'

        ctx.fillText(title, titleX, titleY);

        const descriptionWidth = ctx.measureText(description).width;
        const descriptionX = (canvasWidth - descriptionWidth) / 2;
        const descriptionY = titleY + descriptionHeight + 10;

        // Font & Size description
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';

        ctx.fillText(description, descriptionX, descriptionY);

        // Convert canvas to jpeg buffer
        const buffer = canvas.toBuffer('image/jpeg');

        // Send response with the image
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': buffer.length
        });
        res.end(buffer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

const unknownRoute = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ 
        status: 'error', 
        message: 'Not found!' 
    });
}

export { index, processApi, generateApi, unknownRoute }