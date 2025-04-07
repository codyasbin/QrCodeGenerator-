const qrType = document.getElementById("qr-type");
const inputFields = document.getElementById("input-fields");
const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrCodeContainer = document.getElementById("qrcode");
const downloadBtn = document.getElementById("download-btn");

let qr;

function updatePlaceholder() {
  const type = qrType.value;
  inputFields.innerHTML = "";

  if (type === "wifi") {
    inputFields.innerHTML = `
      <input type="text" id="wifi-ssid" placeholder="Wi-Fi Name (SSID)" />
      <input type="text" id="wifi-password" placeholder="Wi-Fi Password" />
      <select id="wifi-type">
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">No Password</option>
      </select>
    `;
  } else {
    const placeholder = {
      text: "Enter text here",
      url: "Enter full URL (https://...)",
      email: "Enter email address",
      phone: "Enter phone number",
    }[type];
    inputFields.innerHTML = `<input type="text" id="qr-input" placeholder="${placeholder}" />`;
  }
}

function getQRValue() {
  const type = qrType.value;
  if (type === "text" || type === "url") {
    return document.getElementById("qr-input").value.trim();
  }
  if (type === "email") {
    return "mailto:" + document.getElementById("qr-input").value.trim();
  }
  if (type === "phone") {
    return "tel:" + document.getElementById("qr-input").value.trim();
  }
  if (type === "wifi") {
    const ssid = document.getElementById("wifi-ssid").value.trim();
    const password = document.getElementById("wifi-password").value.trim();
    const encryption = document.getElementById("wifi-type").value;
    return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
  }
  return "";
}

generateBtn.addEventListener("click", () => {
  const qrValue = getQRValue();
  if (!qrValue) return alert("Please fill in the input fields!");

  qrCodeContainer.innerHTML = "";
  qr = new QRCode(qrCodeContainer, {
    text: qrValue,
    width: 200,
    height: 200,
  });

  // Delay to wait for QR code render
  setTimeout(() => {
    const qrCanvas = qrCodeContainer.querySelector("canvas");
    if (qrCanvas) {
      const dataURL = qrCanvas.toDataURL("image/png");
      downloadBtn.href = dataURL;
      downloadBtn.style.display = "inline-block";
    }
  }, 500);
});

qrType.addEventListener("change", updatePlaceholder);

window.addEventListener("DOMContentLoaded", updatePlaceholder);
