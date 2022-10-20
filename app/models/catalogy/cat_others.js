module.exports=(sequelize,Sequelize)=>{
    const Other=sequelize.define("cat_other",{
        userId_FK:{type: Sequelize.INTEGER, allowNull: false},
        registryId_FK:{type: Sequelize.INTEGER, allowNull: false},
        title:{type: Sequelize.STRING, allowNull: false},
        author:{type: Sequelize.STRING, allowNull: false},
        publicationDate:{type: Sequelize.STRING, allowNull: false},
        publisher:{type: Sequelize.STRING,null:false},
        series:{type: Sequelize.STRING},
        issuingAuthority:{type: Sequelize.STRING},
        softItem:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:false},
        total:      {   type:   Sequelize.INTEGER,allowNull:false,defaultValue:0},
        available:      {   type:   Sequelize.INTEGER,allowNull:false,defaultValue:0},
        itemCover:{type: Sequelize.STRING,UNIQUE:true, allowNull: true},
        itemPath:{type: Sequelize.STRING,UNIQUE:true, allowNull: false},
        shelfmark:{type:Sequelize.STRING,allowNull:false,defaultValue:"absent"},
        description:{type: Sequelize.TEXT, allowNull: false},
        published:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue: false}
    });
    return Other;
}