// 格式化时间显示
function getTime(time, format) {
  if (format) {
    return time.split(/T|\..+/, 2).join(' ');
  }
  const minutes = (new Date() - new Date(time)) / 60000;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = weeks / 4;
  const years = months / 12;
  if (minutes < 60) {
    return `${Math.floor(minutes) > 0 ? Math.floor(minutes) : 0} 分钟前`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} 小时前`;
  } else if (days < 7) {
    return `${Math.floor(days)} 天前`;
  } else if (weeks < 4) {
    return `${Math.floor(weeks)} 周前`;
  } else if (months < 12) {
    return `${Math.floor(months)} 月前`;
  }
  return `${Math.floor(years)} 年前`;
}

// 获取标签
function getTag(item, crt) {
  if (item.top) {
    return 'top';
  } else if (crt && crt !== 'home') {
    return crt;
  }
  return item.good ? 'good' : item.tab;
}

// 错误处理函数
function error(err, _this) {
  if (err.response) {
    _this.promptText = err.response.data.error_msg;
    _this.prompt = true;
  }
}

export { getTime, getTag, error };
