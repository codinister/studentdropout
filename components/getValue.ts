import replaceDot from '@/utils/replaceDot';

const getValue = ({ ...options }) => {
  const { data, value } = options;
  return data.find((v: { value: string }) => replaceDot(v.value) == value)?.label;
};

export default getValue;
