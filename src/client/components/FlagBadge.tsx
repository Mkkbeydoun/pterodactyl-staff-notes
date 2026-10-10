import type { Flag } from '../api';
import { FLAG_LABEL } from '../api';

const STYLES: Record<Exclude<Flag, 'none'>, string> = {
    vip: 'rxsn:border-success rxsn:text-success',
    watch: 'rxsn:border-warning rxsn:text-warning',
    problem: 'rxsn:border-destructive rxsn:text-destructive',
};

export default function FlagBadge({ flag }: { flag: Flag }) {
    if (flag === 'none') return null;

    return (
        <span
            className={`rxsn:inline-flex rxsn:items-center rxsn:rounded rxsn:border rxsn:px-1.5 rxsn:py-0.5 rxsn:text-xs rxsn:font-semibold rxsn:uppercase rxsn:tracking-wide ${STYLES[flag]}`}
        >
            {FLAG_LABEL[flag]}
        </span>
    );
}
