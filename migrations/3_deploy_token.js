const EdublocksToken = artifacts.require("EdublocksToken");
const EdublocksTokenSale = artifacts.require("EdublocksTokenSale");

module.exports =async function(deployer){
    await deployer.deploy(EdublocksToken,1000000).then(async (instance)=>{
        var tokenInstance = instance;
        var tokenPrice = 100000000000000;
        await deployer.deploy(EdublocksTokenSale,EdublocksToken.address,tokenPrice).then((instance)=>{
            var tokenSaleInstance = instance;
            tokenInstance.transfer(tokenSaleInstance.address,1000000);
        })
    });
};
