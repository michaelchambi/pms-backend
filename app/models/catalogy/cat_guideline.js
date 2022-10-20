module.exports=(sequelize,Sequelize)=>{
    const Guidline=sequelize.define("cat_guidline",{
        registryId_FK:{type:Sequelize.INTEGER},
        userId_FK:{type:Sequelize.INTEGER},
        title:{type: Sequelize.STRING},
        description:{type: Sequelize.TEXT},
        issuingAuthority:{type:Sequelize.STRING,allowNull:false},
        publicationDate:{type:Sequelize.STRING},
        shelfmark:{type:Sequelize.STRING,allowNull:false,defaultValue:"absent"},
        softItem:{type:Sequelize.STRING,allowNull:false},
        total:      {   type:   Sequelize.INTEGER,allowNull:false,defaultValue:0},
        guidlineCover:{type:Sequelize.STRING,defaultValue: "default.png"},
        fileUrl:{type:Sequelize.STRING},
        visibility:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:false}
    });
    return Guidline;
}