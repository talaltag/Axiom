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
  const utcDate = new Date(date.toUTCString());

  return `${utcDate.getUTCSeconds()} ${utcDate.getUTCMinutes()} ${utcDate.getUTCHours()} ${utcDate.getUTCDate()} ${
    utcDate.getUTCMonth() + 1
  } ${utcDate.getUTCDay()}`;
};

export const totalCountInArray = (data, key) => {
  return data.reduce((acc, curr) => acc + parseInt(curr[key]), 0);
};
