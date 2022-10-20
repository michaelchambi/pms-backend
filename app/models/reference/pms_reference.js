module.exports=(sequelize,Sequelize)=>{
    const Reference=sequelize.define("reference",{
        referenceId: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
        referenceNumber: {type: Sequelize.STRING,unique:'compositeIndex'},
        referenceName:{type: Sequelize.STRING,unique:'compositeIndex',},
        privacy:{type: Sequelize.BOOLEAN, allowNull: false},
        title:{type: Sequelize.STRING},
        registryId_FK:{type:Sequelize.INTEGER},
        userId_FK:{type:Sequelize.INTEGER}},
        {
            indexes: [
                {
                    unique: true,
                    fields: ['referenceNumber', 'referenceName']
                }
            ]
        });
    return Reference;
}