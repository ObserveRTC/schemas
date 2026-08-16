import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['test/**/*.test.ts'],
		environment: 'node',
		// The golden fixtures are byte-exact; a snapshot that "helpfully" updates
		// itself would defeat the point of having them.
		snapshotFormat: { printBasicPrototype: true },
	},
});
