module.exports=(sequelize,Sequelize)=>{
    const GovernmentNotice=sequelize.define("cat_notice",{
        registryId_FK:{type:Sequelize.INTEGER},
        userId_FK:{type:Sequelize.INTEGER},
        issuingAuthority:{type:Sequelize.STRING},
        governmentNoticeNumber:{type:Sequelize.STRING,unique:'compositeIndex',},
        governmentNoticeYear:{type:Sequelize.STRING,unique:'compositeIndex',},
        title:{type:Sequelize.STRING,unique:'compositeIndex',},
        assentDate:{type:Sequelize.STRING},
        commencementDate:{type:Sequelize.STRING},
        softItem:{type:Sequelize.STRING,allowNull:false},
        total:      {   type:   Sequelize.INTEGER,allowNull:false,defaultValue:0},
        fileCover:{type:Sequelize.STRING},
        fileUrl:{type:Sequelize.STRING},
        visibility:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:false}
    },
        {
            uniqueKeys: {
                compositeIndex: {
                    fields: ['governmentNoticeNumber', 'governmentNoticeYear','title']
                }
        }
    })
    return GovernmentNotice;
}