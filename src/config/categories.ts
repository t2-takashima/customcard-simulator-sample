export type Orientation = "portrait" | "landscape";

export interface BrandConfig {
  frameImages: Record<Orientation, string>;
  backgroundImageUrls: Record<Orientation, string>;
  availableOrientations: Orientation[];
}

export const brands: Record<string, BrandConfig> = {
  "sample": {
    frameImages: {
      portrait: "",
      landscape: "",
    },
    backgroundImageUrls: {
      portrait: "",
      landscape: "",
    },
    availableOrientations: ["portrait", "landscape"],
  },
  "necorepublic": {
    frameImages: {
      portrait: "https://contents.nudge-platform.com/custom-card-category/12/file-visa_logo_image_portrait-d48c13eb-a0af-459a-9766-a222c323c873-8ee8c35e-2198-41bc-9c43-050630d34ca0-e7b8a6e38386e383b3e38395e3829ae383ac5fe3838de382b3e383aae3838fe3829a5f7265.png",
      landscape: "https://contents.nudge-platform.com/custom-card-category/12/file-visa_logo_image_landscape-26e9c2a2-d370-4fef-b729-10d0289c5378-66096f10-3ac4-4126-b5a3-2d1ecb3d47c8-e6a8aae38386e383b3e38395e3829ae383ac5fe3838de382b3e383aae3838fe3829a5f7265.png",
    },
    backgroundImageUrls: {
      portrait: "",
      landscape: "",
    },
    availableOrientations: ["portrait", "landscape"],
  },
  "kidogs": {
    frameImages: {
      portrait: "https://contents.nudge-platform.com/custom-card-category/13/file-visa_logo_image_portrait-4b9585b0-156e-46fa-9078-8124e5d6bd55-6c68f101-c250-4386-95d7-3fd8ed1b6d0d-e7b8a6e38386e383b3e38395e3829ae383ac5f4b49444f47535fe382afe38299e383a9e38386e38299e8aabfe695b4.png",
      landscape: "https://contents.nudge-platform.com/custom-card-category/13/file-visa_logo_image_landscape-19a8ea58-f934-4f58-a087-6385ec6044e6-f621a813-8698-4db7-86db-7e57fcaafb9d-e6a8aae38386e383b3e38395e3829ae383ac5f4b49444f47535f7265.png",
    },
    backgroundImageUrls: {
      portrait: "",
      landscape: "",
    },
    availableOrientations: ["portrait", "landscape"],
  },
  "hikky_purple": {
    frameImages: {
      portrait: "https://contents.nudge-platform.com/custom-card-category/4/file-visa_logo_image_portrait-da1381c8-5205-449a-939a-8750947ea1d9-b1c2a0f3-86bf-4ac6-a6cf-da779504bdc5-purpleVISA.png",
      landscape: "",
    },
    backgroundImageUrls: {
      portrait: "https://contents.nudge-platform.com/custom-card-category/4/file-card_background_image_portrait-84178850-7763-4df2-aa8b-014a671cc618-df6f5f3d-4bf2-4449-890a-01680000e378-purple_background.png",
      landscape: "",
    },
    availableOrientations: ["portrait"],
  },
  "hikky_blue": {
    frameImages: {
      portrait: "https://contents.nudge-platform.com/custom-card-category/3/file-visa_logo_image_portrait-e3bbb136-8140-4caa-9d6f-3517fd177c3e-c331fc2c-7aae-4ed1-bcb8-7e9e8cafb63b-blueVISA.png",
      landscape: ""
    },
    backgroundImageUrls: {
      portrait: "https://contents.nudge-platform.com/custom-card-category/3/file-card_background_image_portrait-ccd9a62a-00b3-406d-bfc7-2ba3abb299c8-2e31eded-0ec0-443a-91e8-0e1d29302aae-blue_background.png",
      landscape: ""
    },
    availableOrientations: ["portrait"]
  },
  "24karat": {
    frameImages: {
      portrait: "https://contents.nudge-platform.com/custom-card-category/8/file-visa_logo_image_portrait-748360e8-033a-4eab-aef4-937e6cc4cbee-3cfe8b9a-f52c-41bb-b5f0-f5649dc862cc-img_24karat_band.png",
      landscape: ""
    },
    backgroundImageUrls: {
      portrait: "https://contents.nudge-platform.com/custom-card-category/8/file-card_background_image_portrait-d0b71345-6fba-45cd-8d18-3a20a8bec7eb-e31889b7-1336-4560-ad77-387d555385ac-img_24karat_bg.png",
      landscape: ""
    },
    availableOrientations: ["portrait"]
  }
};
