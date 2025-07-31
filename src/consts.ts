// Site configuration constants
export const SITE_TITLE: string = "川崎浩史 オフィシャルサイト";
export const SITE_TWITTER: string = "https://x.com/bianchiidentity";
export const SITE_GITHUB: string = "https://github.com/bianchiidentity";

// Site metadata type
export type SiteMetadata = {
  title: string;
  twitter: string;
  github: string;
}

// Site metadata object
export const siteMetadata: SiteMetadata = {
  title: SITE_TITLE,
  twitter: SITE_TWITTER,
  github: SITE_GITHUB,
};
