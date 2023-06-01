module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING,
      allowNull: true
    },
    category: {
      type: Sequelize.STRING,
      allowNull: true
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }
  });

  return Tutorial;
};
