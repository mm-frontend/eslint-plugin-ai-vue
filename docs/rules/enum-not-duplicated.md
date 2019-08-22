# enum.js name cannot be duplicated (enum-not-duplicated)

Please describe the origin of the rule here.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
// a/enum.js
export const alarmStatusList = [
  {
    name: '未标记',
    value: SUSPECT_STATUS_MAP.UNMARK,
  },
  {
    name: '已标记',
    value: SUSPECT_STATUS_MAP.MARKED,
  },
  {
    name: '已忽略',
    value: SUSPECT_STATUS_MAP.IGNORED,
  },
]
// b/enum.js
export const alarmStatusList = [
  {
    name: '未处理',
    value: YES_OR_NO.NO,
  },
  {
    name: '已处理',
    value: YES_OR_NO.YES,
  },
]



```

Examples of **correct** code for this rule:

```js

export const suspectStatusList = [
  {
    name: '未标记',
    value: SUSPECT_STATUS_MAP.UNMARK,
  },
  {
    name: '已标记',
    value: SUSPECT_STATUS_MAP.MARKED,
  },
  {
    name: '已忽略',
    value: SUSPECT_STATUS_MAP.IGNORED,
  },
]

export const alarmStatusList = [
  {
    name: '未处理',
    value: YES_OR_NO.NO,
  },
  {
    name: '已处理',
    value: YES_OR_NO.YES,
  },
]

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
