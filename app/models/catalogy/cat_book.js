module.exports=(sequelize,Sequelize)=>{
    const Book=sequelize.define("cat_book",{
        isbn:{type:Sequelize.STRING,unique:'compositeIndex',},
        registryId_FK:{type:Sequelize.INTEGER,unique:'compositeIndex',},
        userId_FK:{type:Sequelize.INTEGER},
        dcn:{type:Sequelize.STRING},
        din:{type:Sequelize.STRING},
        author:{type:Sequelize.STRING},
        title:{type:Sequelize.STRING},
        subtitle:{type:Sequelize.STRING},
        editionStatement:{type:Sequelize.STRING},
        publicationPlace:{type:Sequelize.STRING},
        publisher:{type:Sequelize.STRING},
        publicationDate:{type:Sequelize.STRING},
        numberOfPages:{type:Sequelize.INTEGER},
        otherPhysicalDetails:{type:Sequelize.STRING},
        accompanyingMaterial:{type:Sequelize.STRING},
        seriesStatement:{type:Sequelize.STRING},
        generalNote:{type:Sequelize.STRING},
        bibliography:{type:Sequelize.TEXT},
        description:{type:Sequelize.TEXT},
        languageNote:{type:Sequelize.STRING},
        formSubdivision:{type:Sequelize.STRING},
        shelfMark:{type:Sequelize.STRING},
        softItem:{type:Sequelize.STRING,allowNull:false},
        total:      {   type:   Sequelize.INTEGER,allowNull:false,defaultValue:0},
        availability:{type:Sequelize.INTEGER,allowNull:false,defaultValue:0},
        bookCover:{type:Sequelize.STRING},
        fileUrl:{type:Sequelize.STRING},
        privacyLevel:{type:Sequelize.INTEGER,defaultValue:0},
        visibility:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:false},
        status:{type:Sequelize.INTEGER,defaultValue:0},
    },
        {
            uniqueKeys: 
            {
                compositeIndex: 
                {
                    fields: ['isbn', 'registryId_FK']
                }
            }
      
    });
    return Book;
}