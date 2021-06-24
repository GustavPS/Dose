export NODE_ENV=development
prod=false;
while getopts ":pi" opt; do
  case ${opt} in
    p ) # process option p (production mode)
        export NODE_ENV=production
        prod=true
        ;;
    i ) # process option i
      npm install
      ;;
    \? ) echo "Usage: cmd [-p (production)] [-i (force-install)]"
      ;;
  esac
done

if [ "$prod" = true ] ; then
    npm run build
    npm run start
else
    npm run dev
fi