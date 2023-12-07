const Personnel = require("../models/Personnel");

// @URL     GET /api/personnels
// @desc    List all personnels
// @access  admin
exports.list = async (req, res) => {
  res.status(200).json(res.results);
};

// @URL     GET /api/personnels/:id
// @desc    read a single personnel
// @access  admin - private/owner
exports.read = async (req, res) => {
  const data = await Personnel.findById(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};

// @URL     POST /api/personnels
// @desc    create a personnel
// @access  Admin
exports.create = async(req, res)=>{
    const data = await Personnel.create(req.body)
    res.status(201).json({
        success: true,
        data,
      });
}


// @URL     PUT /api/personnels/:id
// @desc    update personnel info
// @access  admin - private/owner
exports.update = async (req, res) => {
  const data = await Personnel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  //const data = await Personnel.updateOne({_id: req.params.id}, req.body, {new: true, runValidators:true})

  res.status(202).json({
    success: true,
    data,
  });
};


// @URL     DELETE /api/personnels/:id
// @desc    delete a single personnel
// @access  admin
exports.delete= async(req, res)=>{

    const data = await Personnel.findByIdAndDelete(req.params.id)
    res.status(204).json({
        success: true,
        data,
      });
}