import dayjs from 'dayjs';

const DateFormatter = ({ publishDate }) => {
    // return dayjs(publishDate).format('MMMM DD, YYYY [at] h:mm A');
    return dayjs(publishDate).format('MMMM DD, YYYY');
};

export default DateFormatter;
