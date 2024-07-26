import { BaseFlex, type BaseFlexProps } from "./BaseFlex";

type ColumnProps = Omit<BaseFlexProps, "direction">;

export const Column: React.FC<ColumnProps> = ({ children, ...props }) => {
	return (
		<BaseFlex {...props} direction="column">
			{children}
		</BaseFlex>
	);
};
