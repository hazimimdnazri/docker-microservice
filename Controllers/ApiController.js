const index = (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(`Connection from ${ip}`)
    res.send('It is working!')
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

const unknownRoute = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ 
        status: 'error', 
        message: 'Not found!' 
    });
}

export { index, processApi, unknownRoute }