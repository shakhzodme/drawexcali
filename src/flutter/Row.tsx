import { BaseFlex, type BaseFlexProps } from "./BaseFlex";

type RowProps = Omit<BaseFlexProps, "direction">;

export const Row: React.FC<RowProps> = ({ children, ...props }) => {
	return (
		<BaseFlex {...props} direction="row">
			{children}
		</BaseFlex>
	);
};
