# Kebijakan Branch RKK

## 1. Single-Branch Workflow
RKK menggunakan model single-branch.
- `main` adalah **satu-satunya** branch permanen.
- Semua implementasi, refactor, dan fix digabungkan ke `main` secara progresif.
- Dilarang memelihara branch staging/dev jangka panjang.

## 2. Larangan
1. **Dilarang keras** melakukan `git push --force` ke `main`.
2. **Dilarang keras** melakukan rebase pada `main`.
3. **Dilarang keras** menghapus riwayat (`git reset --hard`) yang sudah didorong ke remote.
4. **Dilarang** menyatukan frontend dan backend di folder yang sama di root (harus di dalam `/apps`).
