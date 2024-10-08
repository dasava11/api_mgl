const { Contact } = require("../db");
const { Op, Model } = require("sequelize");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No se encontraron clientes" });
    }

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).json({ message: "No se envió un id" });
    }

    const contactById = await Contact.findByPk(id);

    if (!contactById) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el id: ${id}` });
    }

    return res.status(200).json(contactById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postContact = async (req, res) => {
  try {
    const { user_name, phone, user_email, message } = req.body;

    if (!user_name || !user_email || !message) {
      return res.status(500).json({ message: "Falta información" });
    }

    const existingContact = await Contact.findOne({
      where: {
        user_name: {
          [Op.iLike]: user_name,
        },
      },
    });

    if (existingContact) {
      return res.status(500).json({ message: `${user_name} ya existe` });
    }

    await Contact.create({
      user_name,
      phone,
      user_email,
      message,
    });

    return res
      .status(201)
      .json({ message: `${user_name} fue creado con éxito!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingContact = await Contact.findByPk(id);

    if (!existingContact) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el id: ${id}` });
    }

    if (existingContact.active === true) {
      await existingContact.update({ active: false });
      return res.status(200).json({
        message: `${existingContact.user_name} fue borrado exitosamente`,
      });
    } else {
      await existingContact.update({ active: true });
      return res.status(200).json({
        message: `${existingContact.user_name} fue activado exitosamente`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  postContact,
  deleteContact,
};
