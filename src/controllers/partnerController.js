const { Partner } = require("../db");
const { Op } = require("sequelize");

const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.findAll();

    if (partners.length === 0) {
      return res.status(404).json({ message: "No se encontraron socios" });
    }

    return res.status(200).json(partners);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPartnerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).json({ message: "No se envió un id" });
    }

    const partnerById = await Partner.findByPk(id);

    if (!partnerById) {
      return res
        .status(404)
        .json({ message: `No se encontraron socios con el id: ${id}` });
    }

    return res.status(200).json(partnerById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postPartner = async (req, res) => {
  try {
    const {
      name,
      rol,
      email,
      img,
      specialty,
      linkedin,
      description,
      specialtyES,
      rolES,
      descriptionES,
    } = req.body;

    if (!name || !img || !specialty || !rol || !rolES || !specialtyES) {
      return res.status(500).json({ message: "Falta información" });
    }

    const existingPartner = await Partner.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (existingPartner) {
      return res.status(500).json({ message: `${name} ya existe` });
    }

    await Partner.create({
      name,
      email,
      rol,
      img,
      specialty,
      description,
      linkedin,
      specialtyES,
      rolES,
      descriptionES,
    });

    return res.status(201).json({ message: `${name} fue creado con éxito!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putPartner = async (req, res) => {
  try {
    const {
      partner_id,
      name,
      rol,
      email,
      img,
      specialty,
      linkedin,
      description,
      specialtyES,
      rolES,
      descriptionES,
    } = req.body;

    const existingPartner = await Partner.findByPk(partner_id);

    if (!existingPartner) {
      return res.status(404).json({
        message: `No se encontraron socios con el id: ${partner_id}`,
      });
    }

    if (name) {
      await existingPartner.update({ name });
    }

    if (rol) {
      await existingPartner.update({ rol });
    }
    if (rolES) {
      await existingPartner.update({ rolES });
    }
    if (email) {
      await existingPartner.update({ email });
    }

    if (img) {
      await existingPartner.update({ img });
    }
    if (specialty) {
      await existingPartner.update({ specialty });
    }
    if (specialtyES) {
      await existingPartner.update({ specialtyES });
    }
    if (linkedin) {
      await existingPartner.update({ linkedin });
    }
    if (description) {
      await existingPartner.update({ description });
    }
    if (descriptionES) {
      await existingPartner.update({ descriptionES });
    }

    return res
      .status(200)
      .json({ message: `${name} fue actualizado con éxito` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingPartner = await Partner.findByPk(id);

    if (!existingPartner) {
      return res
        .status(404)
        .json({ message: `No se encontraron socios con el id: ${id}` });
    }

    if (existingPartner.active === true) {
      await existingPartner.update({ active: false });
      return res.status(200).json({
        message: `${existingPartner.name} fue desactivado exitosamente`,
      });
    } else {
      await existingPartner.update({ active: true });
      return res
        .status(200)
        .json({ message: `${existingPartner.name} fue activado exitosamente` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPartners,
  getPartnerById,
  postPartner,
  putPartner,
  deletePartner,
};
