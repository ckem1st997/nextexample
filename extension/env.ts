var basePortDev = "localhost:5005";
var basePortProduct = "localhost:5005";
var basePortDevMaster = "localhost:50001";
var basePortProductMaster = "localhost:50001";
var getPort = process.env.NODE_ENV === 'development' ? basePortDev : basePortProduct;
var baseUrlWareHouse = `http://${process.env.NODE_ENV === 'development' ? basePortDev : basePortProduct}/api/v1`;
var baseUrlMaster = `http://${process.env.NODE_ENV === 'development' ? basePortDevMaster : basePortProductMaster}/api/v1`;
export const baseUrlService = {
    baseUrlMaster,
    baseUrlWareHouse
};



