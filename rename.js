const fs = require("fs");
fs.renameSync(
  "src/routes/lessons_.kruti-dev.$lessonId.tsx",
  "src/routes/lessons_.kruti-dev_.$lessonId.tsx",
);
console.log("Renamed successfully");
