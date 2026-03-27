# GitHub Actions and Linode LKE

This repository now includes two workflows:

- `.github/workflows/deploy-lke-cluster.yml`
  Creates a new Linode Kubernetes Engine cluster from GitHub Actions
- `.github/workflows/deploy-lke-app.yml`
  Builds the `web` and `api` images, pushes them to GHCR, and deploys the app to LKE

## Required GitHub secrets

- `LINODE_TOKEN`
  Needed only for cluster creation
- `KUBE_CONFIG`
  Needed for app deployments
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `STREAM_KEY_SECRET`

## Recommended GitHub variables

- `K8S_NAMESPACE`
  Example: `ugclive-bid`
- `APP_HOST`
  Example: `app.ugclivebid.com`
- `API_HOST`
  Example: `api.ugclivebid.com`

## Suggested order

1. Add `LINODE_TOKEN` to repository secrets
2. Run `Deploy LKE Cluster - UGCLive-Bid`
3. Download the kubeconfig artifact from that workflow run
4. Save the kubeconfig contents as the repository secret `KUBE_CONFIG`
5. Add the remaining runtime secrets
6. Run `Deploy UGCLive-Bid to LKE`

## Notes

- The media-origin deployment is included, but production WebRTC/RTMP behavior still needs a finalized `OvenMediaEngine` configuration
- The current deployment workflow assumes GHCR image publishing
- TLS and DNS are still required after the cluster and workloads are live
