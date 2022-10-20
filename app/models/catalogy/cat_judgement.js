module.exports=(sequelize,Sequelize)=>{
    const Judgement=sequelize.define("cat_judgement",{
        judgementId:{type:Sequelize.INTEGER ,autoIncrement: true,primaryKey: true},
        registryId_FK:{type:Sequelize.INTEGER,unique:'compositeIndex',},
        userId_FK:{type:Sequelize.INTEGER},
        courtLevel:{type:Sequelize.STRING},
        courtName:{type:Sequelize.STRING},
        caseNumber:{type:Sequelize.STRING,unique:'compositeIndex',},
        caseType:{type:Sequelize.STRING},
        parties:{type:Sequelize.TEXT},
        caseSubtype:{type:Sequelize.STRING},
        judge:{type:Sequelize.STRING},
        caseDecisionType:{type:Sequelize.STRING},
        flyNotes:{type:Sequelize.STRING},
        facts:{type:Sequelize.STRING},
        lawPrinciple:{type:Sequelize.STRING},
        ratioDecident:{type:Sequelize.STRING},
        obitaDictum:{type:Sequelize.STRING},
        conflictedDecision:{type:Sequelize.STRING},
        dissentingDecision:{type:Sequelize.STRING},
        casesRefered:{type:Sequelize.STRING},
        decisionDate:{type:Sequelize.STRING},
        referedLaw:{type:Sequelize.STRING},
        softItem:{type:Sequelize.STRING,allowNull:false},
        shelfMark:{type:Sequelize.STRING,allowNull:false},
        total:      {   type:   Sequelize.INTEGER,allowNull:false,defaultValue:0},
        availability:{type:Sequelize.INTEGER,allowNull:false,defaultValue:0},
        fileCover:{type:Sequelize.STRING},
        fileUrl:{type:Sequelize.STRING},
        visibility:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:false}
    },
        {
            uniqueKeys: {
                compositeIndex: {
                    fields: ['caseNumber', 'registryId_FK']
                }
        }
    })
    return Judgement;
}