import numpy as np

class MinMaxScaler:
    @staticmethod
    def scale(x: np.ndarray, target_range=[-1, 1]):
        a, b = target_range
        assert b > a, "End of range must be larger than start of range"
        x = np.asarray(x)
        x_min = x.min()
        x_max = x.max()
        scaled = (x - x_min) / (x_max - x_min + 1e-9)  
        return scaled * (b - a) + a  