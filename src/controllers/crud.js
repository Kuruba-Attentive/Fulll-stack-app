const getList = Model => async (req, res) => {
  try {
    const list = await Model.find().sort({ updatedAt: -1 }).lean().exec();
    res.send(list);
  } catch (error) {
    res.status(400).send({ error });
  }
};

const getOne = Model => async (req, res) => {
  try {
    const entity = await Model.findById(req.params.id).lean().exec();
    res.send(entity);
  } catch (e) {
    sendErrorResponse(e, res);
  }
};

const create = Model => async (req, res) => {
  try {
    const newEntity = await Model.create(req.body);
    res.send(newEntity);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateOne = Model => async (req, res) => {
  try {
    const deletedEntity = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(deletedEntity);
  } catch (e) {
    sendErrorResponse(e, res);
  }
};

const deleteOne = Model => async (req, res) => {
  try {
    const deletedEntity = await Model.findByIdAndDelete(req.params.id);
    res.send(deletedEntity);
  } catch (e) {
    sendErrorResponse(e, res);
  }
};

module.exports = model => ({
  getList: getList(model),
  create: create(model),
  deleteOne: deleteOne(model),
  updateOne: updateOne(model),
  getOne: getOne(model)
});

const sendErrorResponse = (error, res) => {
  res.send({ error });
};
