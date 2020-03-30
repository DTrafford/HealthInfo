const Tip = require("../models/tip");

exports.createTip = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  let fileName;
  if (req.file) {
    fileName = req.file.filename;
    tip = new Tip({
      title: req.body.title,
      url: req.body.url,
      content: req.body.content,
      creatorId: req.body.userId,
      imagePath: url + "/images/" + fileName
    });
  } else {
    tip = new Tip({
      title: req.body.title,
      url: req.body.url,
      content: req.body.content,
      creatorId: req.body.userId,
      imagePath: null
    });
  }
  tip
    .save()
    .then(createdTip => {
      res.status(201).json({
        message: "Tip Added",
        tip: {
          ...createdTip,
          id: createdTip._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Tip Creation Failed"
      });
    });
};

exports.updateTip = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.imagePath === "object") {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.imagePath.filename;
  }

  tip = new Tip({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creatorId: req.userData.userId,
    creatorName: req.userData.displayName,
    replies: req.body.replies,
    imagePath: imagePath
  });
  delete tip._id;

  Tip.updateOne(
    { _id: req.params.id, creatorId: req.userData.userId },
    {
      title: tip.title,
      content: tip.content,
      creatorId: req.userData.userId,
      creatorName: req.userData.displayName,
      replies: req.body.replies,
      imagePath: tip.imagePath
    }
  )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update Successful" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Updated Failed"
      });
    });
};

exports.deleteTip = (req, res, next) => {
  Tip.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Tip Deleted" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deletion Failed"
      });
    });
};

exports.getTipList = (req, res, next) => {
  const pageSize = +req.query.pagesize; // The + sign converts the strings to numbers
  const currentPage = +req.query.page;
  const tipQuery = Tip.find();
  let fetchedTips;
  if (pageSize && currentPage) {
    tipQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  tipQuery
    .find()
    .then(documents => {
      fetchedTips = documents;
      return Tip.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Tips Fetched Succesfully",
        tips: fetchedTips,
        totalTips: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not retrieve tips"
      });
    });
};

exports.getSingleTip = (req, res, next) => {
  Tip.findById(req.params.id)
    .then(tip => {
      if (tip) {
        res.status(200).json(tip);
      } else {
        res.status(404).json({ message: "Tip not found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Tip Not Found By Server"
      });
    });
};
