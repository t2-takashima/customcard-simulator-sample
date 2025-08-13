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
            portrait: "https://contents.nudge-platform.com/custom-card-category/1/file-visa_logo_image_portrait-73f65ddb-0394-468e-94ac-e881e97c4a3f-6855ad48-3791-4248-b48d-7092efb12bc0-purple.png",
            landscape: "",
        },
        backgroundImageUrls: {
            portrait: "https://contents.nudge-platform.com/custom-card-category/1/file-sample_image-013501c5-66bc-49c1-8abc-8c8f070a8904-7706f060-1d06-494f-8a03-1cae3db7a0dc-purple-bg.png",
            landscape: "",
        },
        availableOrientations: ["portrait"],
    },
    "hikky_blue": {
        frameImages: {
            portrait: "https://contents.nudge-platform.com/custom-card-category/2/file-visa_logo_image_portrait-63db82b2-e364-4dcf-8ea9-cec011044125-dc63f2f6-84b7-4037-bcd2-b2d65843138b-blue_3.png",
            landscape: ""
        },
        backgroundImageUrls: {
            portrait: "https://contents.nudge-platform.com/custom-card-category/2/file-sample_image-a03bc8a0-5d4b-4611-b581-11c91e97ad55-8ecca456-c7ff-416b-a52b-ddc73770068b-blue-bg2.png",
            landscape: ""
        },
        availableOrientations: ["portrait"]
    },
    "24Karat": {
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
