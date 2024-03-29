<img src="src/icons/icon-128.png" alt="icon of calmoon" align="right" />

# Calmoon for Garoon [![test](https://github.com/tasshi-me/browser-extension-calmoon/actions/workflows/test.yml/badge.svg)](https://github.com/tasshi-me/browser-extension-calmoon/actions/workflows/test.yml) [![lint](https://github.com/tasshi-me/browser-extension-calmoon/actions/workflows/lint.yml/badge.svg)](https://github.com/tasshi-me/browser-extension-calmoon/actions/workflows/lint.yml)

Make you free from sending/receiving notifications on [Garoon](https://garoon.cybozu.co.jp/) :shushing_face:

- Disable "Notify this update" when you join/leave event
- Auto-read uninformative notifications

For Japanese readers: [README_ja.md](README_ja.md)

## Install

| Chrome                                                                                                                                                                          | Firefox                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [![Install to Chrome](docs/resources/ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/calmoon-for-garoon/adpfpbogonofdljjmipfpheknmadjdck) | [![Install to Firefox](docs/resources/get-the-addon.png)](https://addons.mozilla.org/ja/firefox/addon/calmoon-for-garoon/) |

If you need a zip file, please download from [release page](https://github.com/tasshi-me/browser-extension-calmoon/releases).

## Screen shot

<img src="docs/screen-shots/en/ss-1280x670.png" alt="Screen shot" width="60%" />

## Usage

### Disable "Notify this update" notification

This feature is automatically enabled after installation.

### Auto-read uninformative notifications

Notifications that meet the following rules will be auto-read.

- Notification of schedule modification with an empty body

To use this feature, enable in settings page

- Chrome: Extentions(["`chrome://extensions/`"](chrome://extensions/))->「「Calmoon」」->「Details」->「Options」
- Firefox: Addons(["`about:addons`"](about:addons))->「Calmoon」->「Preferences」

| Option                                | Description                          | Initial value |
| ------------------------------------- | ------------------------------------ | ------------- |
| Auto-read uninformative notifications | Enable/Disable feature               | disabled      |
| Interval                              | Interval of auto-read process (min.) | 5 (min.)      |
| Save                                  | Save current settings                |               |

![Auto-read uninformative notifications](docs/screen-shots/en/auto-read-uninformative-notifications.png)

## Recent updates

See [CHANGELOG.md](CHANGELOG.md).

<!-- ## Usage -->

## Development

```
# setup
$ yarn

# development build
$ yarn start

# production build
$ yarn build
```

## Lisence

This project is licensed under the [MIT license.](./LICENSE)

## Disclaimer

This OSS is my own personal work and does not have any relationship with Cybozu Inc. or any other organization which I belong to.
