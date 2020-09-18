const relativeTime = require('dayjs/plugin/relativeTime')

export default ({ app: { $dayjs } }) => {
    $dayjs.extend(relativeTime)
}