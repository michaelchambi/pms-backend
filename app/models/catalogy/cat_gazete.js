module.exports=(sequelize,Sequelize)=>{
    const GovernmentGazete=sequelize.define("cat_gazete",{
        registryId_FK:{type:Sequelize.INTEGER,unique:'compositeIndex'},
        userId_FK:{type:Sequelize.INTEGER},
        gazeteVolume:{type:Sequelize.STRING,unique:'compositeIndex'},
        gazeteIssueNumber:{type:Sequelize.STRING,unique:'compositeIndex'},
        gazeteDate:{type:Sequelize.STRING},
        summary:{type:Sequelize.STRING},
        softItem:{type:Sequelize.STRING,allowNull:false},
        total:      {   type:   Sequelize.INTEGER,allowNull:false,defaultValue:0},
        shelfmark:{type:Sequelize.STRING,allowNull:false,defaultValue:'absent'},
        gazeteCover:{type:Sequelize.STRING,defaultValue: "default.png"},
        visibility:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:false},
        fileUrl:{type:Sequelize.STRING}},
        {
            uniqueKeys: 
            {
                compositeIndex: 
                {
                    fields: ['registryId_FK', 'gazeteVolume','gazeteIssueNumber']
                }
            }
      
    });
    return GovernmentGazete;
}