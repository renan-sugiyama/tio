<script>
export default {
  middleware({ redirect }) {
    // If the user is not authenticated
    return redirect('/registration/order/list')
  },
}
</script>
