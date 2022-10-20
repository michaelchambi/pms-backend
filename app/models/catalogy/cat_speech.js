module.exports=(sequelize,Sequelize)=>{
    const Speech=sequelize.define("cat_speech",
    {
        registryId_FK:{type:Sequelize.INTEGER},
        userId_FK:  {type:Sequelize.INTEGER},
        title:      {   type:   Sequelize.STRING   ,unique:'compositeIndex' },
        author:     {   type:   Sequelize.STRING    },
        speechDate: {   type:   Sequelize.STRING  ,unique:'compositeIndex'  },
        softItem:   {   type:   Sequelize.STRING,   allowNull:false},
        shelfmark:  {   type:   Sequelize.STRING,  allowNull:false, defaultValue:'NA'},
        total:      {   type:   Sequelize.INTEGER,  allowNull:false, defaultValue:0},
        visibility: {   type:   Sequelize.BOOLEAN,  allowNull:false, defaultValue:false},
        fileCover:  {   type:   Sequelize.STRING    },
        fileUrl:    {   type:   Sequelize.STRING    }},
         {
            uniqueKeys: {
                compositeIndex: {
                    fields: ['title', 'speechDate']
                }
        }
    });
    return Speech;
}