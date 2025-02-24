export const validateHotel = (req, res, next) => {
    const { name, city, address, state, country, code, cheapestPrice } = req.body;
    
    if (!name || !city || !address || !state || !country || !code || !cheapestPrice) {
      return res.status(400).json({ message: "Missing required hotel fields!" });
    }
  
    next();
  };
  