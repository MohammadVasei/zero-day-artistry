# GitHub Pages Deployment Setup

## Workflow Overview

This GitHub Actions workflow automatically builds and deploys your site to GitHub Pages whenever you push to the main branch.

## How It Works

1. **Trigger**: Runs on pushes to `main`, `master`, or `develop` branches
2. **Build**: Installs dependencies and builds the project with `npm run build`
3. **Deploy**: Uploads the `dist/` folder to GitHub Pages (production on main/master only)

## Setup Instructions

### 1. Enable GitHub Pages in Repository Settings

- Go to your repository on GitHub
- Navigate to **Settings** → **Pages**
- Under "Build and deployment":
  - Set **Source** to "GitHub Actions"
  - The deployment will happen automatically

### 2. Configure Your Repository

If deploying to a subdirectory (project site, not user/org site):

Edit `vite.config.ts` and add the base path:

```typescript
export default defineConfig({
  base: '/zero-day-artistry/',  // Your repo name
  // ... rest of config
})
```

### 3. Push Your Code

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### 4. Monitor Deployment

- Go to your repository → **Actions**
- Watch the workflow run
- Once complete, your site will be live at: `https://yourusername.github.io/zero-day-artistry/`

## Environment Protection (Optional)

To require approvals before deploying to production:

1. Go to **Settings** → **Environments**
2. Create `github-pages` environment (if it doesn't exist)
3. Add deployment reviewers

## Troubleshooting

- **Build fails**: Check that `npm run build` works locally
- **Page not found**: Verify the `base` path in `vite.config.ts`
- **Wrong branch deploying**: Edit the `if` condition in the deploy job

## References

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Deploy Pages Action](https://github.com/actions/deploy-pages)
