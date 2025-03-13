import AWS from "aws-sdk";
import moment from "moment";
import { File } from "formidable";
import TournamentPrize from "../models/TournamentPrize";
import Deposit from "../models/Deposit";
import Chat from "../models/Chat";
import Team from "../models/Team";

export const ShowNavigatorDeviceModal = async () => {
  try {
    // First check microphone permission
    const permissionResult = await navigator.permissions.query({
      name: "microphone" as PermissionName,
    });
    if (permissionResult.state === "denied") {
      alert(
        "Please allow microphone access in your browser settings to use this feature."
      );
      return;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(
      (device) => device.kind === "audioinput"
    );
    const dialog = document.createElement("dialog");
    dialog.style.padding = "20px";
    dialog.style.borderRadius = "8px";
    dialog.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";

    // Add close button in top right
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "✕";
    closeButton.style.position = "absolute";
    closeButton.style.right = "10px";
    closeButton.style.top = "10px";
    closeButton.style.border = "none";
    closeButton.style.background = "none";
    closeButton.style.fontSize = "20px";
    closeButton.style.cursor = "pointer";
    closeButton.onclick = () => dialog.close();
    dialog.appendChild(closeButton);

    const title = document.createElement("h3");
    title.textContent = "Select Audio Device";
    dialog.appendChild(title);

    const select = document.createElement("select");
    select.style.width = "100%";
    select.style.padding = "8px";
    select.style.marginBottom = "10px";

    audioDevices.forEach((device) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.text = device.label || `Microphone ${device.deviceId.slice(0, 5)}`;
      select.appendChild(option);
    });

    const button = document.createElement("button");
    button.textContent = "Save Selection";
    button.style.padding = "8px 16px";

    button.onclick = () => {
      localStorage.setItem("preferredMicrophoneId", select.value);
      dialog.close();
    };

    dialog.appendChild(select);
    dialog.appendChild(button);
    document.body.appendChild(dialog);
    dialog.showModal();
  } catch (error) {
    console.error("Error accessing media devices:", error);
    alert("Unable to access microphone. Please check your browser settings.");
  }
};

export const fileToUrl = (file: File) => {
  const blob = new Blob([file], { type: file.type });
  return URL.createObjectURL(blob);
};

export const formatDateCron = (currentDate) => {
  const date = new Date(currentDate);
  return `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1
    } ${date.getDay()}`;
};

export const totalCountInArray = (data, key) => {
  return data.reduce((acc, curr) => acc + parseInt(curr[key]), 0);
};

export const formatCountDown = (duration) => {
  let hours = "00";
  let minutes = "00";
  let seconds = "00";
  if (duration) {
    const totalSeconds = Math.floor(duration.asSeconds());
    hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    seconds = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, "0");
  }

  return `${hours}:${minutes}:${seconds}`;
};

export const countDownTimer = (date: Date, start: string, end?: string) => {
  const [hours, mins] = start.split(":");
  const dateTime = moment(date)
    .add(Number(hours), "hours")
    .add(Number(mins), "minutes");

  if (!end) {
    // Check if the target time has already passed
    const currentTime = moment();

    let diff = moment.duration(dateTime.diff(currentTime));

    // If the target time is in the past, set the countdown to zero
    if (diff.asSeconds() < 0) {
      diff = moment.duration(0); // Set duration to zero if time is up
    }

    return diff;
  } else {
    const [endHours, endMins] = end.split(":");

    const endTime = moment(date)
      .add(Number(endHours), "hours")
      .add(Number(endMins), "minutes");

    let diff = moment.duration(endTime.diff(dateTime));

    // If the target time is in the past, set the countdown to zero
    if (diff.asSeconds() < 0) {
      diff = moment.duration(0); // Set duration to zero if time is up
    }

    return diff.asMinutes();
  }
};

export const positionToRank = (position: number) => {
  if (position === 1) {
    return "1st";
  } else if (position === 2) {
    return "2nd";
  } else if (position === 3) {
    return "3rd";
  } else {
    return `${position}th`;
  }
};

export const monthsCount = {
  jan: 0,
  feb: 0,
  mar: 0,
  apr: 0,
  may: 0,
  jun: 0,
  jul: 0,
  aug: 0,
  sep: 0,
  oct: 0,
  nov: 0,
  dec: 0,
};

export function formatHoursMins(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} Hrs ${remainingMinutes} min`;
}

const s3 = new AWS.S3({
  accessKeyId: "AKIA2SSTC2PGH7VMSRIL", // Replace with your access key
  secretAccessKey: "7QkR80JuyMTZRC/vgEElp0REDpdMLXq12iKX+rFX", // Replace with your secret key
});

export const uploadToS3 = async (
  file: File,
  buffer: any,
  folder?: string
): Promise<string> => {
  // Create a stream from the file buffer

  const params = {
    Bucket: "axiom-bucket-media", // Replace with your bucket name
    Key: folder
      ? `uploads/${folder}/${file.newFilename}`
      : `uploads/${file.newFilename}`, // Adjust path and filename as necessary
    Body: buffer,
    ContentType: file.mimetype, // Ensure correct content type
    ACL: "public-read", // Adjust permissions as needed
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    throw new Error("Error uploading file to S3: " + error.message);
  }
};


export const calculateTotalPrizePool = async (timeline) => {
  try {
    const matchStage = getMatchStage(timeline);

    const result = await TournamentPrize.aggregate([
      matchStage,
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = result[0]?.totalAmount || 0;
    console.log("Total Prize Pool:", totalAmount);
    return totalAmount;
  } catch (err) {
    console.error("Error calculating total prize pool with aggregation:", err);
  }
};

export const calculateTotalPayout = async (timeline) => {
  try {
    const matchStage = getMatchStage(timeline);
    console.log(matchStage, timeline, '---')
    const result = await Deposit.aggregate([
      matchStage,
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = result[0]?.totalAmount || 0;
    console.log("Total Payout:", totalAmount);
    return totalAmount;
  } catch (error) {
    console.error("Error calculating total payout with aggregation:", error);
  }
};

export const getMatchStage = (timeline) => {
  const now = new Date();
  let startDate;

  switch (timeline) {
    case "this_month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "last_month":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      break;
    case "this_year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    case "week":
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case "month":
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    default:
      startDate = new Date(0);
  }

  return {
    $match: {
      createdAt: { $gte: startDate },
    },
  };
};

export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return (((current - previous) / previous) * 100).toFixed(2);
};

export const getPreviousTimeline = (timeline) => {
  switch (timeline) {
    case "this_month":
      return "last_month";
    case "last_month":
      return "month";
    case "this_year":
      return "last_year";
    case "week":
      return "last_week";
    case "month":
      return "last_month";
    default:
      return "month";
  }
};

export const generateGraphData = async (timeline, type) => {
  try {
    const Model = type ? TournamentPrize : Deposit;
    const data = await Model.aggregate([
      getMatchStage(timeline),
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } }
    ]);

    return data.map(item => ({
      date: item._id,
      amount: item.totalAmount,
    }));
  } catch (error) {
    console.error("Error generating graph data", error);
    return [];
  }
};

export const getAllAdminChats = async (timeline) => {
  const matchStage = getMatchStage(timeline);

  return await Chat.aggregate([
    matchStage,
    {
      $lookup: {
        from: 'users',
        localField: 'receiver',
        foreignField: '_id',
        as: 'receiverInfo'
      }
    },
    { $unwind: '$receiverInfo' },
    { $match: { 'receiverInfo.role': 'Admin' } },
    {
      $lookup: {
        from: 'users',
        localField: 'sender',
        foreignField: '_id',
        as: 'senderInfo'
      }
    },
    { $unwind: '$senderInfo' },
    {
      $sort: { createdAt: -1 }
    },
    {
      $limit: 5
    }
  ]);
};

export const getHighestPayout = async (timeline) => {
  try {
    const matchStage = getMatchStage(timeline);

    const data = await Deposit.aggregate([
      matchStage,
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            status: "$status"
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const statuses = ["completed", "pending", "failed"];
    const series = statuses.map((status) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      data: Array(12).fill(0),
    }));

    data.forEach((item) => {
      const monthIndex = item._id.month - 1;
      const statusIndex = statuses.indexOf(item._id.status);
      if (statusIndex >= 0) {
        series[statusIndex].data[monthIndex] = item.count;
      }
    });

    return series;

  } catch (error) {
    console.error("Error generating graph data", error);
  }
}

export const getPlayerEngagementStats = async (timeline) => {
  const matchStage = getMatchStage(timeline);

  const data = await Team.aggregate([
    matchStage,
    {
      $project: {
        month: { $month: "$createdAt" },
        playerCount: { $size: "$members" },
      },
    },
    {
      $group: {
        _id: "$month",
        totalPlayers: { $sum: "$playerCount" },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  const playerData = Array(12).fill(0);

  data.forEach((item) => {
    playerData[item._id - 1] = item.totalPlayers;
  });

  return [
    {
      name: "Players",
      data: playerData,
    },
  ];
};

export const getProfitScale = async (timeline) => {
  const profit = await calculateTotalPrizePool(timeline); //gross profit
  const loss = 0;  //change it later
  const canceled = 0; //change it later

  return [profit, loss, canceled];
};
