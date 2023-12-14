const Model=require("../Models/Model")
module.exports.ajout = async (req, res) => {
    try {
        console.log('Starting ajout function');
        const users = await Model.create(req.body);
        console.log('Model.create successful');
        res.status(200).json(users);
        console.log('Response sent successfully');
    } catch (err) {
        console.error('Error in ajout function:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  
  
module.exports.trouver=async (req,res)=>{
    Model.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
    }
    module.exports.foundId=async (req,res)=>{
        const id=req.params.id
        Model.findById({_id:id})
        .then(users=>res.json(users))
        .catch(err=>res.json(err))
        }
        module.exports.update=async (req,res)=>{
            const id=req.params.id
            Model.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email})
            .then(users=>res.json(users))
            .catch(err=>res.json(err))
            }