# Deploy the Creative Monk API on Oracle Cloud (Always Free) with HTTPS

Always-on, free forever, no cold starts. ~30 min one-time setup.
Result: the API live at `https://api.thecreativemonk.in`, fronted by Caddy (auto TLS),
running the existing Dockerfile via docker-compose.

> You run these on **your** Oracle account. The kit (compose + Caddy) is ready;
> you provide the VM and the DNS record.

---

## 0. Sign up for Oracle Cloud (once)

1. Go to **https://www.oracle.com/cloud/free/** → **Start for free**.
2. You'll need: an email, a mobile number (SMS code), and a **credit/debit card** for
   identity verification only — the Always Free tier is never charged (a small temporary
   hold may appear and is refunded).
3. **Home region is permanent** — pick one close to you. From India choose **India West
   (Mumbai)** or **India South (Hyderabad)** (also the lowest latency to the Turso DB).
4. Finish sign-up (provisioning takes a few minutes), then open the console at
   **https://cloud.oracle.com**.

**Make an SSH key on your computer** (you paste the public half into Oracle):

```bash
ssh-keygen -t ed25519 -C "oracle" -f ~/.ssh/cm_oracle
cat ~/.ssh/cm_oracle.pub      # copy this whole line
```

---

## 1. Create the free VM

In the console (**https://cloud.oracle.com**):

1. Top-left **☰ menu → Compute → Instances → Create instance**.
2. **Name:** `cm-backend`.
3. **Image and shape → Edit:**
   - **Image:** Change image → **Canonical Ubuntu 22.04** → Select.
   - **Shape:** Change shape → **Ampere** tab → **VM.Standard.A1.Flex** →
     set **1 OCPU / 6 GB** (free allows up to 4 OCPU / 24 GB). Look for the green
     **"Always Free-eligible"** label.
4. **Networking:** keep *Create new VCN* and **Assign a public IPv4 address = Yes**.
5. **Add SSH keys:** choose **Paste public keys** and paste the `cm_oracle.pub` line from
   above (or *Generate a key pair for me* and download the private key).
6. **Create.** Wait ~1 min until the instance shows **RUNNING**.

> **"Out of host capacity"?** The free ARM shape is in high demand. Retry the create a
> few times, switch the Availability Domain, or pick a quieter home region. (The AMD
> `VM.Standard.E2.1.Micro` is always available and still runs this app, just with 1 GB RAM.)

**Grab the public IP:** on the instance details page copy the **Public IP address**
(e.g. `140.x.x.x`) — that's the IP for your DNS record below. Connect with:

```bash
ssh -i ~/.ssh/cm_oracle ubuntu@<public-ip>
```

---

## 2. DNS — point your subdomain at the VM

At your domain registrar, add an **A record**:

```
api.thecreativemonk.in   →   <VM public IP>
```

(Use any subdomain you like — just match it in step 5.) Wait a couple of minutes for it
to resolve: `dig +short api.thecreativemonk.in` should return the IP.

---

## 3. Open ports 80 & 443

**a) OCI firewall** — VCN → Subnet → **Security List → Add Ingress Rules**:
`0.0.0.0/0` TCP **80**, and `0.0.0.0/0` TCP **443**. (22 is already open.)

**b) OS firewall** (Oracle's Ubuntu image blocks them by default):

```bash
sudo iptables -I INPUT -p tcp --dport 80  -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

---

## 4. Install Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# log out and back in so the group applies
```

---

## 5. Get the code + secrets

```bash
git clone https://github.com/llSiddharthll/cm-backend.git
cd cm-backend

# backend secrets — same values as your local backend/.env
cp .env.example .env
nano .env          # fill TURSO_*, CLOUDINARY_*, JWT_SECRET, ADMIN_*,
                   # and set CORS_ORIGINS=https://cm-website-five.vercel.app

cd deploy
cp .env.example .env
nano .env          # set API_DOMAIN=api.thecreativemonk.in
```

> Tip: instead of retyping, `scp` your local `backend/.env` to the VM:
> `scp backend/.env ubuntu@<ip>:cm-backend/.env`

---

## 6. Launch

```bash
# from cm-website/backend/deploy
docker compose up -d --build
docker compose logs -f          # watch Caddy fetch the cert (needs DNS + ports ready)
```

Verify:

```bash
curl https://api.thecreativemonk.in/api/health
# {"ok":true,"cloudinary":true,...}
```

The DB is already seeded, so it connects straight away. (The bootstrap admin from your
`.env` is created on first boot.)

---

## 7. Point the site at the API

In the **Vercel** project → Settings → Environment Variables, add:

```
NEXT_PUBLIC_API_URL = https://api.thecreativemonk.in
API_URL             = https://api.thecreativemonk.in
```

Redeploy. Now `cm-website-five.vercel.app` reads live data and `/admin` works in production.

---

## Updating later

```bash
cd cm-backend && git pull
cd deploy && docker compose up -d --build
```

## Handy

- Logs: `docker compose logs -f backend` / `... caddy`
- Restart: `docker compose restart`
- Re-seed (only if you ever wipe data): `docker compose run --rm backend npm run seed`
