
module.exports=(sequelize,Sequelize)=>{
    const Act=sequelize.define("cat_act",{
        registryId_FK:{type:Sequelize.INTEGER,allowNull:false,unique:'compositeIndex'},
        userId_FK:{type:Sequelize.INTEGER},
        shortTitle:{type:Sequelize.STRING,allowNull:false,unique:'compositeIndex'},
        longTitle:{type:Sequelize.STRING},
        actYear:{type:Sequelize.STRING,allowNull:false,unique:'compositeIndex'},
        actNo:{type:Sequelize.STRING,allowNull:false,unique:'compositeIndex'},
        datePassed:{type:Sequelize.STRING},
        dateAssent:{type:Sequelize.STRING},
        commencementDate:{type:Sequelize.STRING},
        shelfmarkId_FK:{type:Sequelize.INTEGER,},
        softItem:{type:Sequelize.STRING,allowNull:false},
        total:      {   type:Sequelize.INTEGER,allowNull:false,defaultValue:0},
        fileUrl:{type:Sequelize.STRING},
        actCover:{type:Sequelize.STRING,defaultValue: "default.png"},
        status:{type:Sequelize.INTEGER}
    },
    {
        uniqueKeys: 
        {
            compositeIndex: 
            {
                fields: ['registryId_FK', 'shortTitle','actYear','actNo']
            }
        }
  

    });
    return Act;
}