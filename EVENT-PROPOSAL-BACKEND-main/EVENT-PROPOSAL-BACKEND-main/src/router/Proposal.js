const router = require("express").Router();

const authenticate = require("../middleware/authenticate");
const Proposal = require("./../model/proposalSchema");

router.post("/add", async (req, res) => {
  const {
    name,
    place,
    proposalType,
    eventType,
    budget,
    startDate,
    endDate,
    description,
    images,
    food,
    events,
    contacts,
    vendorId,
  } = req.body;
  try {
    const upload = new Proposal({
      name,
      place,
      proposalType,
      eventType,
      budget,
      startDate,
      endDate,
      description,
      images,
      food,
      events,
      contacts,
      vendorId,
    });
    const saveData = await upload.save();
    return res.status(201).json({ proposal_Id: saveData._id });
  } catch (err) {
    //type of error to be decided later
    console.log(err);
  }
  // res.send(data)
});

router.get("/event/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const proposalData = await Proposal.findOne({ _id: id });
    if (proposalData) {
      return res.status(201).send(proposalData);
    }
  } catch (err) {
    //type of error to be decided later
    console.log(err);
  }
});

router.get("/findall/:id",authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const proposals = await Proposal.find({ vendorId: id });
    if (proposals) {
      return res.status(201).send(proposals);
    }
  } catch (err) {
    //type of error to be decided later

      return res.status(201).send({error:"Vendor not verified"});
  }
});

router.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const proposal = await Proposal.findByIdAndDelete(id);
    if (proposal) {
      res.status(201).json({ message: "Proposal has been removed" });
    }
  } catch (err) {
    //type of error to be decided later

    console.log(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updateProposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updateProposal) {
      return res.status(201).json(updateProposal);
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = router;
