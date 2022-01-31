interface IProps {
  fileName: string;
  ext: string;
  timestamp?: number;
}

type FuncType = (args: IProps) => string;

/**
 * Generate file name based on it's extension and the current timestamp.
 *
 * @param param Object containing a fineName, extension and the timesamp used
 * build the file name.
 * @returns A new file name.
 */

export const generateFileName: FuncType = ({ fileName, ext, timestamp }) =>
  `${timestamp || Date.now()}-${fileName}.${ext}`;
