const page = document.getElementById("page")
const imageUpload = document.getElementById("imageUpload")
const backgroundImageKey = "onepictab.backgroundImage"

function applyBackground(imageDataUrl) {
  if (imageDataUrl) {
    page.style.backgroundImage = `url("${imageDataUrl}")`
    page.classList.add("has-image")
    return
  }

  page.style.backgroundImage = ""
  page.classList.remove("has-image")
}

function saveImage(file) {
  if (!file || !file.type.startsWith("image/")) {
    return
  }

  const reader = new FileReader()

  reader.addEventListener("load", () => {
    const imageDataUrl = reader.result

    if (typeof imageDataUrl !== "string") {
      return
    }

    try {
      localStorage.setItem(backgroundImageKey, imageDataUrl)
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        alert("The image is too large for storage.\nPlease compress or resize it and try again.")
      } else {
        throw error
      }
      return
    }

    applyBackground(imageDataUrl)
  })

  reader.readAsDataURL(file)
}

imageUpload.addEventListener("change", (event) => {
  const [file] = event.target.files
  saveImage(file)
  imageUpload.value = ""
})

applyBackground(localStorage.getItem(backgroundImageKey))
