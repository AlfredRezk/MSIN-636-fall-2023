const Department = require("../models/Department");
const Personnel = require("../models/Personnel");

// @URL     GET /api/department
// @desc    List all departments
// @access  admin
exports.list = async (req, res) => {
  const data = await Department.find();
  res.status(200).json({
    success: true,
    data,
    count: data.length,
  });
};

// @URL     GET /api/department/:id
// @desc    read a single department
// @access  admin - private/owner
exports.read = async (req, res) => {
  const data = await Department.findById(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};

// @URL     POST /api/department
// @desc    create a department
// @access  Admin
exports.create = async(req, res)=>{
    const data = await Department.create(req.body)
    res.status(201).json({
        success: true,
        data,
      });
}


// @URL     PUT /api/department/:id
// @desc    update department info
// @access  admin - private/owner
exports.update = async (req, res) => {
  const data = await Department.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  //const data = await Personnel.updateOne({_id: req.params.id}, req.body, {new: true, runValidators:true})

  res.status(202).json({
    success: true,
    data,
  });
};


// @URL     DELETE /api/department/:id
// @desc    delete a single department
// @access  admin
exports.delete= async(req, res)=>{

    const data = await Department.findByIdAndDelete(req.params.id)
    res.status(204).json({
        success: true,
        data,
      });
}

// Admin or lead 
exports.getPeronnels = async(req,res)=>{
    const deptId = req.params.id;
    const data = await Personnel.find({departmentId: deptId})
    res.status(200).json({
        success:true, 
        count: data.length, 
        data
    })
}